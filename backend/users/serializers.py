# users/serializers.py
from dj_rest_auth.serializers import LoginSerializer

# Custom login serializer:  replace username,email and password with username_email and password

class CustomLoginSerializer(LoginSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["username"].required = False
        self.fields["username"].style = {"input_type": "email"}
        self.fields["username"].label = "Email"
        self.fields["username"].help_text = "Email"
        self.fields["username"].error_messages = {
            "blank": "Please enter your email",
            "required": "Please enter your email",
        }
        self.fields["password"].label = "Password"
        self.fields["password"].help_text = "Password"
        self.fields["password"].error_messages = {
            "blank": "Please enter your password",
            "required": "Please enter your password",
        }