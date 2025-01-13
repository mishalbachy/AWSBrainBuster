import { Question } from '../types/game';
import assets from '../assets';

export const questions: Question[] = [
  {
    id: '1',
    serviceName: 'Lambda',
    logoUrl: assets.images.services.lambda,
    hints: [
      'This service lets you run code without provisioning servers',
      'It automatically scales your applications',
      'You pay only for the compute time you consume'
    ],
    description: 'AWS Lambda is a serverless compute service that runs your code in response to events.',
    options: ['EC2', 'Lambda', 'ECS']
  },
  {
    id: '2',
    serviceName: 'S3',
    logoUrl: 'https://d1.awsstatic.com/icons/jp/console_s3_icon.64795d08c5e23e92c12cc668c29b14cb00c390dc.png',
    hints: [
      'This service provides object storage through a web interface',
      'It offers industry-leading scalability and data availability',
      'You can store and retrieve any amount of data from anywhere'
    ],
    description: 'Amazon S3 is an object storage service offering industry-leading scalability, availability, and durability.',
    options: ['EFS', 'S3', 'EBS']
  },
  {
    id: '3',
    serviceName: 'DynamoDB',
    logoUrl: 'https://d1.awsstatic.com/icons/jp/console_dynamodb_icon.64795d08c5e23e92c12cc668c29b14cb00c390dc.png',
    hints: [
      'This is a NoSQL database service',
      'It provides single-digit millisecond performance',
      'It supports both document and key-value data models'
    ],
    description: 'Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance.',
    options: ['RDS', 'DynamoDB', 'DocumentDB']
  }
];