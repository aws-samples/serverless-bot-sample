import os
import boto3
from aws_lambda_powertools import Logger
from aws_lambda_powertools.event_handler.api_gateway import ApiGatewayResolver, CORSConfig, Response
from aws_lambda_powertools.logging.correlation_paths import API_GATEWAY_REST

logger = Logger()
BOT_ID = os.environ['BOT_ID']
BOT_ALIAS_ID = os.environ['BOT_ALIAS_ID']
BOT_LOCALE = os.environ['BOT_LOCALE']
app = ApiGatewayResolver(cors=CORSConfig(allow_origin='*'))
clientLEXV2 = boto3.client('lexv2-runtime')


def _validate_chat(params):
    if not params.get('message') or not isinstance(params['message'], str):
        return False

    if not params.get('sessionId') or not isinstance(params['sessionId'], str):
        return False
    return True


@app.post("/chat")
def chat():
    try:
        request_body = app.current_event.json_body
        if not _validate_chat(request_body):
            return Response(
                status_code=400,
                content_type='application/json',
                body='validation error'
            )

        res = clientLEXV2.recognize_text(
            botId=BOT_ID,
            botAliasId=BOT_ALIAS_ID,
            localeId=BOT_LOCALE,
            sessionId=request_body['sessionId'],
            text=request_body['message']
        )
        if res.get('messages'):
            response_message = res['messages'][0]['content']
        else:
            response_message = 'Please ask another question'
        return {'message': response_message}
    except Exception as e:
        logger.error(e)
        return Response(
            status_code=500,
            content_type='application/json',
            body='unexpected error'
        )


@logger.inject_lambda_context(correlation_id_path=API_GATEWAY_REST, log_event=True)
def lambda_handler(event, context):
    return app.resolve(event, context)
