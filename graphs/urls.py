from django.urls import path
from . import views

urlpatterns = [
    path('', views.graph_home, name='graph-home'),
    path('data-update/', views.data_update, name='data-update'),
    path('primary-polls/', views.primary_polls, name='primary-polls'),
    path('primary-line-graphs/', views.primary_line_graphs, name='primary-line-graphs'),
    path('primary-scatter-plots/', views.primary_scatter_plots, name='primary-scatter-plots'),
    path('general-polls/', views.general_polls, name='general-polls'),
    path('general-scatter-plots/', views.general_scatter_plots, name='general-scatter-plots'),
    path('general-line-graphs/', views.general_line_graphs, name='general-line-graphs'),
]
