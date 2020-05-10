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
            'title': "RECOGNIZE THE FAKE",
            'content': "Just because it’s online, doesn’t mean it’s true!",
            'image': 'https://lh6.googleusercontent.com/A7ydsnBaojYJJFt6xbFiZ1bOWIUE4slt1-oIkwe6W2eOajdEeCpuL8gK3d1yHfVlE71G65VcgfGRNgUek9uJZIaJEhKNrpSEbP_UC5G_'
        },
        {
            'title': "BE KIND",
            'content': "Spread positivity and know when to stand up for yourself!",
            'image': 'https://lh5.googleusercontent.com/fGpm476V1N_8oFuIcuDKT1JSuQVo9UsVGexex5N8sPd-Yw4_avaHIinQ9XbG9rgpE5o9kyGu6kV199RKlRA4n9nA65WJoBdxkQ70bJA'
        },
        {
            'title': "SHARE WITH CARE",
            'content': "Not everything should be posted online!",
            'image': 'https://lh6.googleusercontent.com/6UPM3Rg6LbYiYCmAVgt0-CLsCpNRcCDnqzCyYj7rLmzuV9BSN9YEKZV12xsdh_OcdhmYOAXRe5Q6xugrY54DK8cWAg3O2ORD7hDVWKM2'
        },
        {
            'title': "LOCK IT WELL",
            'content': "Make sure your information is safe!",
            'image': 'https://lh6.googleusercontent.com/2owuaqRNCL1j8yWC8u6JeoUGgNfSC9b5wCax1kFMWeupLP5KYjHi-TJYjd-IrNOJjjXivzxydCNYE86a-dHPMjtiksHudQqeNdnNq4qs'
        },
    ]
    return render_template('learn.html', cards=cards)

if __name__ == '__main__':
    app.run(debug=True)