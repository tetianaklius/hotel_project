from better_profanity import profanity

class ProfanityChecker:

    def check_profanity(self, data: dict) -> dict | bool:
        if profanity.contains_profanity(data["comment"]):
            return False

        return data