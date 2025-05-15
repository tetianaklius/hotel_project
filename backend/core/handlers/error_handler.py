from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import exception_handler


def error_handler(exception: Exception, context: dict):
    handlers = {
        "JWTException": _jwt_validation_exception_handler,
        "ProfanityCheckException": _profanity_check_exception_handler,
    }
    response = exception_handler(exception, context)
    exception_class = exception.__class__.__name__

    if exception_class in handlers:
        return handlers[exception_class](exception, context)

    return response


def _jwt_validation_exception_handler(exception, context):
    return Response({"detail": "JWT expired or invalid"}, status.HTTP_401_UNAUTHORIZED)


def _profanity_check_exception_handler(exception, context):
    return Response(
        {
            "Message": "Sorry, your review contains profanity words. You need to edit it. "
                       "You have 3 attempts to do it before the opportunity to leave a review will be lost."
                       "If you have any questions, please contact us by phone or email."
                       "site",
            # "Message": "Вибачте, Ваше повідомлення містить нецензурну лексику. Щоб виправити це, Ви маєте 3 спроби. "
            #            "Після третьої невдалої спроби можливість залишити відгук буде втрачено. "
            #            "Якщо у Вас залишаться питання, телефонуйте або пишіть нам на е-скриньку."
        },
        # тут має вивестися заповнена попереднім текстом форма todo
        status.HTTP_406_NOT_ACCEPTABLE
    )
