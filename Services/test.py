import joblib

feature_columns = joblib.load("../Models/Student_Depression_Model.pkl")

print(type(feature_columns))
print(type(feature_columns))
# import os

# print(os.listdir("Models"))