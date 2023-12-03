from PIL import Image
import requests
import io

def process_image_from_uri(file_uri):
    try:
        # Remove the 'file://' prefix from the URI
        file_path = file_uri.replace('file://', '')

        # Open the image using PIL (Python Imaging Library)
        with Image.open(file_path) as img:
            # Perform operations on the image
            img = img.rotate(90)  # For example, rotate the image by 90 degrees

            # Save the modified image to a new file
            img.save('processed_image.jpg')  # Save the processed image as 'processed_image.jpg'

            return {'message': 'Image processed successfully'}
    except Exception as e:
        return {'error': str(e)}

# Example usage
file_uri = 'file:///data/data/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fapp-1adfa971-78f7-4f0d-9732-7786279fde9d/Camera/c371af79-cfe3-4fd0-b227-d00b1d646f1e.jpg'
result = process_image_from_uri(file_uri)
print(result)
