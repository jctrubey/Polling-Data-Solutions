from django.db import models
from datetime import datetime


class Data(models.Model):
    question_id = models.DecimalField(max_digits=8, decimal_places=0, null=True)
    poll_id = models.DecimalField(max_digits=8, decimal_places=0, null=True)
    state = models.CharField(max_length=25, null=True)
    pollster_id = models.DecimalField(max_digits=8, decimal_places=0, null=True)
    pollster = models.CharField(max_length=50, null=True)
    pollster_rating_id = models.DecimalField(max_digits=8, decimal_places=0, null=True)
    fte_grade = models.CharField(max_length=5, null=True)
    sample_size = models.DecimalField(max_digits=8, decimal_places=0, null=True)
    office_type = models.CharField(max_length=25, null=True)
    date = models.DateField(null=True)
    url = models.CharField(max_length=200, null=True)
    stage = models.CharField(max_length=25, null=True)
    party = models.CharField(max_length=20, null=True)
    answer = models.CharField(max_length=50, null=True)
    candidate_name = models.CharField(max_length=50, null=True)
    pct = models.DecimalField(max_digits=8, decimal_places=0, null=True)

    def __str__(self):
        date = ''
        if self.date:
            date = self.date.strftime("%m/%d/%Y")
        return str(self.question_id) + ', ' + self.candidate_name + ', ' + date + ', ' + str(self.pct)

class General_Data(models.Model):
    date = models.DateField(null=True)
    candidate_name = models.CharField(max_length=50, null=False)
    pct = models.DecimalField(max_digits=8, decimal_places=1, null=False)

    def __str__(self):
        date = ''
        if self.date:
            date = self.date.strftime("%m/%d/%Y")
        return self.candidate_name + ', ' + date + ', ' + str(self.pct)