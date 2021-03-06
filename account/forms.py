from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError


class UserLoginForm(forms.Form):
    """ Form used to log the user in """
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)


class UserRegistrationForm(UserCreationForm):
    """ Form used to register a new user & create an account """
    password1 = forms.CharField(
        label="Password", 
        widget=forms.PasswordInput)
    password2 = forms.CharField(
        label="Confirm Password", 
        widget=forms.PasswordInput)
    first_name = forms.CharField(
        label="First Name",
        required=True,
    )
    last_name = forms.CharField(
        label="Last Name",
        required=True,
    )
    email = forms.CharField(
        label="Email Address",
        required=True,
    )

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email',  'password1', 'password2']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        username = self.cleaned_data.get('username')
        if User.objects.filter(email=email).exclude(username=username):
            raise forms.ValidationError(u'An account is already assigned with this email')
        return email
    
    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')

        if not password1 or not password2:
            raise ValidationError("Please enter a password")

        if password1 != password2:
            raise ValidationError("Passwords must match")

        return password2