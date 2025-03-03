import { execSync } from 'child_process';

const generateApi = () => {
    try {
        // Ensure the FastAPI server is running before generating
        console.log('Generating API client...');
        execSync('npm run generate-api', { stdio: 'inherit' });
        console.log('API client generated successfully!');
    } catch (error) {
        console.error('Error generating API client:', error);
        process.exit(1);
    }
};

generateApi();