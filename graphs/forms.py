import io
from django import forms
from .models import Data
from django.contrib.auth.models import User
import csv


class DataForm(forms.Form):
    data_file = forms.FileField()
