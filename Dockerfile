FROM public.ecr.aws/lambda/nodejs:18
WORKDIR ${LAMBDA_TASK_ROOT}

COPY ./ ./

RUN npm ci --omit=dev 
RUN NODE_ENV=production npm run build

CMD ["lambda.handler"]