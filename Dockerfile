# Use Node 14 as the base image
FROM node:14

# Set working directory inside the container
WORKDIR /botpress

# Copy everything from your local project folder to the container
COPY . .

# Make the bp binary executable (optional for Linux)
RUN chmod +x ./bp

# Expose Botpress default port
EXPOSE 3000

# Start Botpress
CMD ["./bp"]
