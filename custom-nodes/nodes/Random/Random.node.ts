import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IHttpRequestOptions,
	NodeOperationError,
	ApplicationError,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:random.svg',
		group: ['transform'],
		version: 1,
		description: 'Generate true random numbers using Random.org API',
		defaults: {
			name: 'Random',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{
						name: 'True Random Number Generator',
						value: 'trueRandomNumber',
						description: 'Generate a true random number using Random.org',
						action: 'Generate true random number',
					},
				],
				default: 'trueRandomNumber',
				noDataExpression: true,
			},
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['trueRandomNumber'],
					},
				},
				default: 1,
				required: true,
				description: 'Minimum value for the random number (inclusive)',
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['trueRandomNumber'],
					},
				},
				default: 100,
				required: true,
				description: 'Maximum value for the random number (inclusive)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			if (operation === 'trueRandomNumber') {
				const min = this.getNodeParameter('min', i) as number;
				const max = this.getNodeParameter('max', i) as number;

				// Validar parâmetros
				if (min > max) {
					throw new ApplicationError('Min value cannot be greater than Max value');
				}				try {
					// Fazer requisição para a API do Random.org
					const requestOptions: IHttpRequestOptions = {
						method: 'GET',
						url: `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`,
						headers: {
							'User-Agent': 'n8n-random-node/1.0',
						},
					};

					const response = await this.helpers.httpRequest(requestOptions);
					
					// Garantir que a resposta seja uma string
					const responseText = typeof response === 'string' ? response : response.toString();
					const randomNumber = parseInt(responseText.trim(), 10);

					if (isNaN(randomNumber)) {
						throw new ApplicationError('Invalid response from Random.org API');
					}

					const item: IDataObject = {
						randomNumber,
						min,
						max,
						timestamp: new Date().toISOString(),
						source: 'random.org',
						operation: 'trueRandomNumber',
					};

					returnData.push(item);
				} catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					throw new NodeOperationError(this.getNode(), `Failed to generate random number: ${errorMessage}`);
				}
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}