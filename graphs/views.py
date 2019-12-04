import csv
import io
import json

from datetime import datetime

from django.contrib import messages
from django.shortcuts import render
from django.http import HttpResponse

from .models import Data, General_Data


def graph_home(request):
    return render(request, 'graphs/graph_home.html')


def primary_polls(request):
    return render(request, 'graphs/primary_polls/primary_polls.html')


def primary_line_graphs(request):
    return render(request, 'graphs/primary_polls/primary_line_graphs.html')

def general_polls(request):
    return render(request, 'graphs/general_polls/general_polls.html')

def general_scatter_plots(request):
    # gets the data for the candidate name and sends it back to javascript
    if request.method == 'GET' and request.is_ajax():
        candidate = request.GET['candidate']
        db_polls = General_Data.objects.filter(candidate_name=candidate).values_list('candidate_name', 'date', 'pct')
        polls = {}
        i = 0
        for result in db_polls:
            polls[i] = {
                'candidate': str(result[0]),
                'date': str(result[1]),
                'pct': str(result[2])
            }
            i = i+1
        return HttpResponse(json.dumps(polls))
    return render(request, 'graphs/general_polls/general_scatter_plots.html')

def general_line_graphs(request):
    return render(request, 'graphs/general_polls/general_line_graphs.html')


def primary_scatter_plots(request):
    # gets the data for the candidate name and sends it back to javascript
    if request.method == 'GET' and request.is_ajax():
        candidate = request.GET['candidate']
        db_polls = Data.objects.filter(candidate_name=candidate).values_list('candidate_name', 'date', 'pct')
        polls = {}
        i = 0
        for result in db_polls:
            polls[i] = {
                'candidate': str(result[0]),
                'date': str(result[1]),
                'pct': str(result[2])
            }
            i = i+1
        return HttpResponse(json.dumps(polls))
    return render(request, 'graphs/primary_polls/primary_scatter_plots.html')


# insert the data from csv file into database
def data_update(request):
    template = "graphs/data_update.html"
    complete = "graphs/graph_home.html"
    if request.method == "GET":
        return render(request, template)
        #check which form is sending the request
    if request.method == 'POST' and 'primary_update_form' in request.POST:
        # if data exists, delete it so we can update the database with new data
        if Data.objects.first():
            Data.objects.all().delete()
            # get the csv file from the request
        csv_file = request.FILES['file']
        #check file is a csv file
        if not csv_file.name.endswith('.csv'):
            messages.error(request, 'THIS IS NOT A CSV FILE')

        data_set = csv_file.read().decode('UTF-8')
        io_string = io.StringIO(data_set)
        next(io_string)
        for column in csv.reader(io_string, delimiter=',', quotechar="|"):
            # reformat the date so it can be properly inserted
            d = datetime.strptime(column[18], '%m/%d/%y')
            d.strftime("%Y-%m-%d")
            if column[9] == '':
                pri = 0
            else:
                pri = int(column[9])
            if column[3] == '':
                state = 'none'
            else:
                state = column[3]
            if column[11] == '':
                fte = 'none'
            else:
                fte = column[11]
                #add data to database
            _, created = Data.objects.update_or_create(

                question_id=int(column[0]),
                poll_id=int(column[1]),
                state=state,
                pollster_id=int(column[4]),
                pollster=column[5],
                pollster_rating_id=pri,
                fte_grade=fte,
                sample_size=int(column[12]),
                office_type=column[16],
                date=d,
                stage=column[27],
                party=column[28],
                answer=column[29],
                candidate_name=column[31],
                pct=float(column[32])
            )

        return render(request, complete)

    #check which form is sending the request
    if request.method == 'POST' and 'general_update_form' in request.POST:
        # if data exists, delete it so we can update the database with new data
        if General_Data.objects.first():
            General_Data.objects.all().delete()
        csv_file = request.FILES['file']
        if not csv_file.name.endswith('.csv'):
            messages.error(request, 'THIS IS NOT A CSV FILE')

        data_set = csv_file.read().decode('UTF-8')
        io_string = io.StringIO(data_set)
        next(io_string)
        for column in csv.reader(io_string, delimiter=',', quotechar="|"):
            # reformat the date so it can be properly inserted
            d = datetime.strptime(column[20], '%m/%d/%y')
            d.strftime("%Y-%m-%d")
                #add data to database
            _, created = General_Data.objects.update_or_create(
                date=d,
                candidate_name=column[33],
                pct=float(column[35])
            )

        return render(request, complete)

