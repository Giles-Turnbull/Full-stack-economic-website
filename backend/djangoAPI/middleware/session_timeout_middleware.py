from django.utils import timezone

# Session timeout middleware that logs the user out after 5 minutes of inactivity
class SessionTimeoutMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    # Check if the user is authenticated and update the last activity time
    def __call__(self, request):
        if request.user.is_authenticated:
            last_activity = request.session.get('last_activity')

            # Check if last activity time is older than 5 mins
            if last_activity and (timezone.now() - last_activity).seconds > 300:
                # log the user out
                from django.contrib.auth import logout
                logout(request)

            # Update last activity time
            request.session['last_activity'] = timezone.now()

        response = self.get_response(request)
        return response