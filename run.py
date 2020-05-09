from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('layout.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/learn')
def learn_more():
    cards = [
        {
            'title': "SHARE WITH CARE",
            'content': "Some quick example text to build on the card title and make up the bulk of the card's content."
        },
        {
            'title': "SHARE WITH CARE",
            'content': "Some quick example text to build on the card title and make up the bulk of the card's content."
        },
        {
            'title': "SHARE WITH CARE",
            'content': "Some quick example text to build on the card title and make up the bulk of the card's content."
        },
        {
            'title': "SHARE WITH CARE",
            'content': "Some quick example text to build on the card title and make up the bulk of the card's content."
        }
    ]
    return render_template('learn.html', cards=cards)

if __name__ == '__main__':
    app.run(debug=True)