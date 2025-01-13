import { Question } from '../types/game'
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

// Configure AWS SDK v3 client
const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY as string
  }
})

// Function to fetch questions from DynamoDB
async function fetchQuestionsFromDynamoDB (): Promise<Question[]> {
  const params = {
    TableName: import.meta.env.VITE_DYNAMODB_TABLE_NAME as string
  }

  try {
    const command = new ScanCommand(params)
    const data = await client.send(command)

    if (data.Items) {
      return data.Items.map((item: any) => {
        const unmarshalledItem = unmarshall(item)
        return {
          id: unmarshalledItem.id,
          serviceName: unmarshalledItem.serviceName,
          logoUrl: unmarshalledItem.logoUrl,
          hints: unmarshalledItem.hints, // Filter out undefined/null values
          options: unmarshalledItem.options
        }
      })
    }
    return []
  } catch (error) {
    console.error('Error fetching data from DynamoDB:', error)
    throw error
  }
}

// Initialize questions array
let questions: Question[] = []

// Function to initialize questions
async function initializeQuestions () {
  try {
    questions = await fetchQuestionsFromDynamoDB()
    console.log('Questions fetched successfully:', questions)
  } catch (error) {
    console.error('Failed to initialize questions:', error)
  }
}

// Call the initialize function
initializeQuestions()

// Export the questions array and the fetch function for potential reuse
export { questions, fetchQuestionsFromDynamoDB }
