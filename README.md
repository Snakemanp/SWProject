# SSFDS Website

## Overview
A course project website developed by Kasyap Kovvuru and Aravind Gavinikadi.

This website integrates restaurants, NGOs, and customers, providing a platform for food ordering, donations, and more.

## Features

- **Restaurant Features:**
  - Upload descriptions, prices, and pictures of items.
  - Check all orders on a selected date.

- **Customer Features:**
  - Order food from any restaurant within 10km.
  - Calculate delivery charges based on distance (0 delivery charge for less than 2km, 5rs per km otherwise).
  - Send menu for self-pickup.
  - Donate food to any NGO within 10km.
  - Change profile information including image, address, and password (user ID not changeable).
  - Check all previous orders.

- **NGO Features:**
  - Check donation histories day-wise.

- **Admin Features:**
  - Access is granted with a passkey; if the passkey is correct, access is allowed, otherwise denied.
  - View all users.
  - Set timings for restaurant login portal.

- **Additional Features:**
  - Password recovery via email.

## Technologies Used

- **Frontend:** React
- **Backend:** Express
- **Database:** MongoDB
- **Image Management:** Cloudinary
- **Email Service:** Nodemailer
- **Geocoding:** OpenCage, MapQuest
- **Distance Calculation:** Geolib
- **Payment Processing:** Stripe

## How to Run

### Build from Source

1. Clone the repository to your local machine.
2. Build the project using Visual Studio or your preferred IDE.
3. Run the generated executable file.

### Run Executable Directly

1. Clone the `x64/release` folder in the repository.
2. Build it using npm.

## Contributors
- Kasyap Kovvuru
- Aravind Gavinikadi

Feel free to update any part of the source code.
