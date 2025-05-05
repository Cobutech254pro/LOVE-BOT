from flask import Flask, render_template, request, jsonify
from data_handling import is_relationship_related
from charting import handle_relationship_query
import time

app = Flask(__name__)
warning_count = 0
WARNING_THRESHOLD = 3

@app.route("/", methods=["GET", "POST"])
def index():
    global warning_count
    response = None

    if request.method == "POST":
        user_query = request.form["query"].strip()
        if is_relationship_related(user_query):
            response = handle_relationship_query(user_query)
            warning_count = 0  # Reset warnings on a valid query
        else:
            warning_count += 1
            response = "⚠️ This bot only handles relationship matters. Please focus your inquiries accordingly, or the session will be ended."
            if warning_count >= WARNING_THRESHOLD:
                response = "You have exceeded the warning limit. The session is now ending."
                # Here, instead of just a response, we might want to signal the front-end to show the finishing dashboard
                return render_template("index.html", response=response, show_dashboard=True)

        return render_template("index.html", response=response, show_dashboard=False)

    return render_template("index.html", show_dashboard=False)

if __name__ == "__main__":
    app.run(debug=True)
  
