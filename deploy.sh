echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Delpoying files to server..."
scp -r build/* ubuntu@13.59.49.252:/var/www/13.59.49.252/

echo "Done!"