FROM public.ecr.aws/lambda/nodejs:18 AS builder 
WORKDIR ${LAMBDA_TASK_ROOT}

COPY ./package*.json ./

RUN npm ci --omit=dev 

FROM public.ecr.aws/lambda/nodejs:18 AS runner 
WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=builder ${LAMBDA_TASK_ROOT}/package.json ./
COPY --from=builder ${LAMBDA_TASK_ROOT}/node_modules ./
COPY . .

RUN NODE_ENV=production npm run build
CMD ["lambda.handler"]