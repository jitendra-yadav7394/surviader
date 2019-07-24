from django.shortcuts import render
# from adult.models import Adult
# import csv
# from adult import adult_dataset

# # Create your views here.


# def home(request):
#     with open(adult_dataset, 'rt') as f:
#         data = csv.DictReader(f)
#         for row in data:
#             print(row)
#             # Adult.objects.create(
#             #     age=int(row['age']),
#             #     work=row['work'],
#             #     fnlwgt=int(row['fnlwgt']),
#             #     education=row['education'],
#             #     education_num=int(row['education_num']),
#             #     marital_status=row['marital_status'],
#             #     occupation=row['occupation'],
#             #     relationship=row['relationship'],
#             #     race=row['race'],
#             #     sex=row['sex'],
#             #     capital_gain=int(row['capital_gain']),
#             #     capital_loss=int(row['capital_loss']),
#             #     hours_per_week=int(row['hours_per_week']),
#             #     native_country=row['native_country'],
#             #     salary=row['salary'],
#             # )
#     import pdb; pdb.set_trace()
#     return 3
