# Feature: Prepare Payment Details

## 1. User Goal

Allow pet owners to view and prepare payment details for a selected pet service before making payment.

The system should show the selected service, its price, currency and payment status so users can review the information.

## 2. Scope

This feature will:

* Allow users to prepare payment details for three available pet services.
* Retrieve the correct price from a mock service catalogue.
* Return the payment details in JSON format.
* Display a payment status of `READY_FOR_PAYMENT`.
* Allow users to access the endpoint without logging in.

This feature will NOT:

* Process or charge actual payments.
* Connect to a real payment gateway.
* Create new database tables.
* Create new EJS pages.
* Accept payment amounts provided by users.

## 3. Request

HTTP Method: GET

Endpoint: `/payments/prepare/:serviceId`

The user must provide a service ID in the URL.

The system will use the service ID to find the corresponding service in the mock catalogue.

The payment amount must come from the server's catalogue and not from user input.

## 4. Service Catalogue

The following services are available:

| Service ID | Service Name | Price (SGD) |
| ---------- | ------------ | ----------- |
| 1          | Vaccination  | 35          |
| 2          | Pet Grooming | 50          |
| 3          | Boarding     | 80          |

The service ID and price are numbers, while the service name is a string.

## 5. Successful Response

When a valid service ID is provided, the system should return HTTP status code 200.

The JSON response must contain exactly five fields:

* `serviceId`
* `serviceName`
* `amount`
* `currency`
* `status`

No additional fields are allowed, and JSON field order does not matter.

```json
{
  "serviceId": 1,
  "serviceName": "Vaccination",
  "amount": 35,
  "currency": "sgd",
  "status": "READY_FOR_PAYMENT"
}
```

Data types:

* `serviceId`: Number (not a string)
* `serviceName`: String
* `amount`: Number
* `currency`: String
* `status`: String

The currency must always be `sgd`.

The status must always be `READY_FOR_PAYMENT`.

## 6. Unsuccessful Response

If the requested service does not exist in the mock service catalogue, the system should return HTTP status code 404.

Expected JSON response:

```json
{
  "error": "Service not found"
}
```

## 7. Acceptance Criteria

* **AC1:** When service ID 1 is requested, the system returns HTTP 200 with Vaccination and an amount of 35.
* **AC2:** When service ID 2 is requested, the system returns HTTP 200 with Pet Grooming and an amount of 50.
* **AC3:** When service ID 3 is requested, the system returns HTTP 200 with Boarding and an amount of 80.
* **AC4:** When service ID 999 is requested, the system returns HTTP 404 with the error message "Service not found".
* **AC5:** Every successful response must contain exactly five fields with the correct data types, currency `sgd`, and status `READY_FOR_PAYMENT`.

## 8. Open Questions

* How should the system handle invalid service IDs that are not numbers, such as letters?
* Should the system return a different error message for a missing or incorrectly formatted service ID?

These questions have not been agreed upon and should be clarified before adding new validation rules.
