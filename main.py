import time
from welcome import welcome_message
from charting import handle_relationship_query
from data_handling import is_relationship_related

WARNING_THRESHOLD = 3
warning_count = 0

def main():
    global warning_count
    welcome_message()

    while warning_count < WARNING_THRESHOLD:
        user_input = input("> ").strip()

        if is_relationship_related(user_input):
            handle_relationship_query(user_input)
        else:
            warning_count += 1
            print("⚠️ This bot only handles relationship matters. Please focus your inquiries accordingly, or the session will be ended.")
            if warning_count >= WARNING_THRESHOLD:
                print("You have exceeded the warning limit. The session is now ending.")
                show_finishing_dashboard()
                break

    if warning_count >= WARNING_THRESHOLD:
        print("Thank you for considering our relationship support.")

def romantic_animated_sentence():
    sentence = "💖 Our hearts hope you find connection and joy again. 💖"
    for i in range(len(sentence) + 1):
        print(sentence[:i], end='\r')
        time.sleep(0.1)
    print()

def show_finishing_dashboard():
    print("\n--- Finishing Dashboard ---")
    romantic_animated_sentence()
    print("-------------------------")

if __name__ == "__main__":
    main()
