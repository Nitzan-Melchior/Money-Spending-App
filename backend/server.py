from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from zoneinfo import ZoneInfo
from enum import Enum

app = Flask(__name__)
CORS(app)

# Location and setup of database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

# Category enum
class Category(Enum):
    TRAVEL = "Travel"
    RESTAURANTS = "Restaurants and Nightlife"
    FOOD_AND_GROCERIES = "Food and Groceries"
    BILLS = "Bills"
    LEISURE ="Leisure"
    LIFESTYLE = "Lifestyle"
    OTHER = "Other"

# Month dictionary
months = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
}

    


# DB model
class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Numeric(scale=2), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    category = db.Column(db.Enum(Category), nullable=False)
    date_added = db.Column(db.Date, default=lambda: datetime.now(ZoneInfo("Asia/Jerusalem")).date())

    # To be able to jsonify and pass to react
    def convert_to_dic(self):
        dic = {"id": self.id, "amount": float(self.amount), "title": self.title, "category": self.category.value, "date added": self.date_added.isoformat()}
        return dic


# URL definitions

@app.route('/')
def view():
    expenses = Expense.query.all()
    expense_list = [exp.convert_to_dic() for exp in expenses]
    return jsonify(expense_list), 201


@app.route('/add', methods=['POST'])
def add():
    data = request.get_json()
    amount = data.get('amount')
    title = data.get('title')
    category = data.get('category')
    
    try:
        category_enum = Category(category)
    except ValueError:
        return jsonify({"Invalid Category": 400}), 400

    exp = Expense(amount=amount, title=title, category=category_enum)
    db.session.add(exp)
    db.session.commit()
    return jsonify(exp.convert_to_dic()), 201

@app.route('/clear', methods=['POST'])
def clear():
    Expense.query.delete()
    db.session.commit()
    return jsonify({"cleared db": 200}), 200

@app.route('/delete', methods=['POST'])
def delete():
    data = request.get_json()
    to_del = Expense.query.filter_by(title=data.get('title')).first()
    if not to_del:
        return jsonify({"no entry with the title provided": 404}), 404
    db.session.delete(to_del)
    db.session.commit()
    return jsonify(to_del.convert_to_dic()), 200


@app.route('/category_search', methods=['POST'])
def category_search():
    data = request.get_json()
    date = datetime.now()
    month = date.month
    year = date.year
    if data.get('filter') == 'Category':
        content = data.get('content')
        try:
            category_enum = Category(content)
            expenses = Expense.query.filter(
                db.func.extract("month", Expense.date_added) == month,
                db.func.extract("year", Expense.date_added) == year, 
                Expense.category == category_enum
            ).all()
        except ValueError:
            return jsonify({"invalid category": 400}), 400
    else:
        return jsonify({"invalid filter": 400}), 400
    
    exp_lst = [exp.convert_to_dic() for exp in expenses]
    return jsonify(exp_lst), 200
    
    

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    filter = data.get('filter')
    if filter == 'Date':
        month = months[data.get('month')]
        year = int(data.get('year'))
        expenses = Expense.query.filter(db.func.extract("month", Expense.date_added) == month, db.func.extract("year", Expense.date_added) == year).all()
    
    elif filter == 'Title':
        content = data.get('content')
        expenses = Expense.query.filter_by(title = content).all()
    elif filter == 'Category':
        content = data.get('content')
        try:
            category_enum = Category(content)
            expenses = Expense.query.filter_by(category = category_enum).all()
        except ValueError:
            return jsonify({"invalid category": 400}), 400
    else:
        return jsonify({"invalid filter": 400}), 400
    
    exp_lst = [exp.convert_to_dic() for exp in expenses]
    return jsonify(exp_lst), 200

@app.route('/display')
def display():
    date = datetime.now()
    month = date.month
    expenses = Expense.query.filter(db.func.extract("month", Expense.date_added) == month).all()
    total = 0
    for ex in expenses:
        total += ex.amount
    output = [date.strftime("%B"), total]
    for category in Category:
        expenses = Expense.query.filter(db.func.extract("month", Expense.date_added) == month, Expense.category == category).all()
        second = 0
        for ex in expenses:
            second += ex.amount
        output.append(second)
    output.append(date.strftime("%Y"))
    return jsonify(output), 200


        

        

# Running the app
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)