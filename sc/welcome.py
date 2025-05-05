import time

def bigger_breaking_heart_animation():
    heart = [
        "     █████     ",
        "   █████████   ",
        "  ███████████  ",
        " █████████████ ",
        " █████████████ ",
        " █████████████ ",
        "  ███████████  ",
        "   █████████   ",
        "     █████     "
    ]

    break_stages = [
        [4, "   ███ ███   "],
        [5, "  ███   ███  "],
        [6, " ███     ███ "],
        [3, "  ███   ███  ", 6, "   ███ ███   "],
        [4, " ██       ██ ", 5, "  ███   ███  "],
        [2, " ███     ███ ", 6, " ███     ███ "],
        [3, "███       ███", 4, "███       ███", 5, "███       ███"],
        [1, "███         ███", 7, "███         ███"],
        [0, "███           ███", 8, "███           ███"]
    ]

    blood_drops = [
        [9, "   ·   "],
        [10, "    ·  "],
        [11, "   ·    "],
        [12, "  ·     "],
        [13, " ·      "],
        [14, "·       "]
    ]

    print("\n".join(heart))
    time.sleep(0.5)

    for stage in break_stages:
        new_heart = list(heart)
        for i in range(0, len(stage), 2):
            line_index = stage[i]
            new_line = list(new_heart[line_index])
            replacement = list(stage[i+1])
            start_index = (len(new_line) - len(replacement)) // 2
            for j in range(len(replacement)):
                new_line[start_index + j] = replacement[j]
            new_heart[line_index] = "".join(new_line)
        print("\n".join(new_heart), end='\r')
        heart = new_heart
        time.sleep(0.3)

    for drop in blood_drops:
        line_index = drop[0]
        new_heart = list(heart)
        if line_index < len(new_heart):
            new_line = list(new_heart[line_index])
            replacement = list(drop[1])
            start_index = (len(new_line) - len(replacement)) // 2
            for j in range(len(replacement)):
                if start_index + j < len(new_line):
                    new_line[start_index + j] = replacement[j]
            new_heart[line_index] = "".join(new_line)
            print("\n".join(new_heart), end='\r')
            heart = new_heart
            time.sleep(0.2)

def welcome_message():
    bigger_breaking_heart_animation()
    print("\nMy dearest friend, welcome! Step into a space where matters of the heart are met with understanding and care.")
    print("How may I help you with your relationship today?")

if __name__ == '__main__':
    welcome_message()
