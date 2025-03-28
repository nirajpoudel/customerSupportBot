FROM node:14

# Set working directory in the container
WORKDIR /botpress

# Copy all local files into the container
COPY . .

# Install dependencies (Botpress usually prebuilt, but include this just in case)
RUN npm install --production

# Expose default Botpress port
EXPOSE 3000

# Start Botpress
CMD ["./bp"]
