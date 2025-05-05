def is_relationship_related(text):
    keywords = ["relationship", "love", "partner", "friend", "family", "communication",
                "conflict", "feeling", "connected", "expectations", "breakup", "dating",
                "marriage", "intimacy", "trust", "jealousy", "insecurity", "forgiveness",
                "support", "attachment", "co-parenting", "infidelity"]
    text = text.lower()
    for keyword in keywords:
        if keyword in text:
            return True
    return False

if __name__ == '__main__':
    print(is_relationship_related("I'm having trouble with communication in my relationship."))
    print(is_relationship_related("What's the weather like today?"))
    print(is_relationship_related("My family is having some disagreements."))
    print(is_relationship_related("Tell me a joke about cats and dogs."))
