import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
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

# Use Decision Tree Classifier instead of Logistic Regression
model = DecisionTreeClassifier(random_state=0)

model.fit(X_train, y_train)

# Retrieve feature importances instead of coefficients
feature_importances = model.feature_importances_

feature_names = X.columns

feature_importance_dict = dict(zip(feature_names, feature_importances))

for feature, importance in feature_importance_dict.items():
    print(f"{feature}: {importance:.4f}")

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print("Decision Tree model accuracy (in %):", accuracy * 100)

json_filename = "importances.json"
with open(json_filename, 'w') as json_file:
    json.dump(feature_importance_dict, json_file)

print(f"Feature importances have been saved to '{json_filename}'.")

print(y_pred)

class_values = balanced_dataset['Class'].tolist()

json_file_path = "class_values.json"

with open(json_file_path, 'w') as json_file:
    json.dump(class_values, json_file)

print(f"Class values have been saved to '{json_file_path}'.")

precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

print("Decision Tree model evaluation:")
print(f"Accuracy: {accuracy * 100:.2f}%")
print(f"Precision: {precision:.4f}")
print(f"Recall: {recall:.4f}")
print(f"F1 Score: {f1:.4f}")
