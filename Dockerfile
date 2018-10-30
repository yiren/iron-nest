# 第一階段產生dist資料夾
FROM node:alpine

# 指定預設/工作資料夾
WORKDIR /usr/nestapp

# 只copy package.json檔案
COPY ./package.json ./
# 安裝dependencies
RUN npm install

# copy其餘目錄及檔案
COPY ./ ./

COPY src src

# 指定建立production檔案
CMD ["npm", "run", "prestart:prod"]



# 第二階段只需要dist資料夾，不須額外安裝web framework的dependency

FROM node:alpine

# 從第一階段的檔案copy
COPY --from=0 /usr/nestapp/dist /dist 

CMD ["node", "dist/main.js"]





