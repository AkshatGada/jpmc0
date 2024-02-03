import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import json

file_path = "c:/Users/Aksha/Downloads/archive/creditcard_2023.csv"
df = pd.read_csv(file_path)

columns_to_exclude = ['id', 'Amount']
df_filtered = df.drop(columns=columns_to_exclude, errors='ignore')

class_0_rows = df_filtered[df_filtered['Class'] == 0].sample(n=125, random_state=42)
class_1_rows = df_filtered[df_filtered['Class'] == 1].sample(n=125, random_state=42)

balanced_dataset = pd.concat([class_0_rows, class_1_rows])

balanced_dataset_json = balanced_dataset.drop('Class', axis=1)
first_250_rows = balanced_dataset

json_data = balanced_dataset_json.to_dict(orient='records')

json_filename = "balanced_dataset.json"
with open(json_filename, 'w') as json_file:
    json.dump(json_data, json_file)

X = first_250_rows.drop('Class', axis=1)
y = first_250_rows['Class']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression(random_state=0)

model.fit(X_train, y_train)

coefficients = model.coef_[0]

feature_names = X.columns

feature_coefficients = dict(zip(feature_names, coefficients))

for feature, coefficient in feature_coefficients.items():
    print(f"{feature}: {coefficient:.4f}")

y_pred = model.predict(X_train)  # Predict on the training set

accuracy = accuracy_score(y_train, y_pred)  # Evaluate accuracy on the training set
print("Logistic Regression model accuracy (in %) - First Run (on Training Set):", accuracy * 100)

json_filename = "weights.json"
with open(json_filename, 'w') as json_file:
    json.dump(feature_coefficients, json_file)

print(f"Coefficients have been saved to '{json_filename}'.")

print(y_pred)

class_values = balanced_dataset['Class'].tolist()

json_file_path = "class_values.json"

with open(json_file_path, 'w') as json_file:
    json.dump(class_values, json_file)
    print(f"Class values have been saved to '{json_file_path}'.")

precision = precision_score(y_train, y_pred)
recall = recall_score(y_train, y_pred)
f1 = f1_score(y_train, y_pred)

print("Logistic Regression model evaluation - First Run (on Training Set):")
print(f"Accuracy: {accuracy * 100:.2f}%")
print(f"Precision: {precision:.4f}")
print(f"Recall: {recall:.4f}")
print(f"F1 Score: {f1:.4f}")

# Second Run of Logistic Regression on the same training dataset

model.fit(X_train, y_train)  # Retraining on the same data

y_pred_second = model.predict(X_train)  # Predict on the training set

accuracy_second = accuracy_score(y_train, y_pred_second)  # Evaluate accuracy on the training set for the second run
print("\nLogistic Regression model accuracy (in %) - Second Run (on Training Set):", accuracy_second * 100)

loss = model.score(X_train, y_train)  # Calculating loss (inversed accuracy)
print(f"Loss: {1 - loss}")

print(y_pred_second)

precision_second = precision_score(y_train, y_pred_second)
recall_second = recall_score(y_train, y_pred_second)
f1_second = f1_score(y_train, y_pred_second)

print("\nLogistic Regression model evaluation - Second Run (on Training Set):")
print(f"Accuracy: {accuracy_second * 100:.2f}%")
print(f"Precision: {precision_second:.4f}")
print(f"Recall: {recall_second:.4f}")
print(f"F1 Score: {f1_second:.4f}")



# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LogisticRegression
# from sklearn.metrics import accuracy_score
# import  json
# from sklearn.metrics import precision_score, recall_score, f1_score

# file_path = "c:/Users/Aksha/Downloads/archive/creditcard_2023.csv"
# df = pd.read_csv(file_path)


# columns_to_exclude = ['id', 'Amount']
# df_filtered = df.drop(columns=columns_to_exclude, errors='ignore')


# class_0_rows = df_filtered[df_filtered['Class'] == 0].sample(n=125, random_state=42)
# class_1_rows = df_filtered[df_filtered['Class'] == 1].sample(n=125, random_state=42)

# balanced_dataset = pd.concat([class_0_rows, class_1_rows])

# balanced_dataset_json = balanced_dataset.drop('Class',axis=1)
# first_250_rows = balanced_dataset

# json_data = balanced_dataset_json.to_dict(orient='records')

# json_filename = "balanced_dataset.json"
# with open(json_filename,'w') as json_file :
#     json.dump(json_data,json_file)

# X = first_250_rows.drop('Class', axis=1)
# y = first_250_rows['Class']

# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# model = LogisticRegression(random_state=0)

# model.fit(X_train, y_train)

# coefficients = model.coef_[0]

# feature_names = X.columns

# feature_coefficients = dict(zip(feature_names, coefficients))

# for feature, coefficient in feature_coefficients.items():
#     print(f"{feature}: {coefficient:.4f}")

# y_pred = model.predict(X_test)

# accuracy = accuracy_score(y_test, y_pred)
# print("Logistic Regression model accuracy (in %):", accuracy * 100)


# json_filename = "weights.json"
# with open(json_filename, 'w') as json_file:
#     json.dump(feature_coefficients, json_file)

# print(f"Coefficients have been saved to '{json_filename}'.")

# print(y_pred)

# class_values = balanced_dataset['Class'].tolist()

# json_file_path = "class_values.json"

# with open(json_file_path,'w') as json_file:
#     json.dump(class_values,json_file)

#     print(f"Class values have been saved to '{json_file_path}'.")

# precision = precision_score(y_test, y_pred)
# recall = recall_score(y_test, y_pred)
# f1 = f1_score(y_test, y_pred)

# print("Logistic Regression model evaluation:")
# print(f"Accuracy: {accuracy * 100:.2f}%")
# print(f"Precision: {precision:.4f}")
# print(f"Recall: {recall:.4f}")
# print(f"F1 Score: {f1:.4f}")