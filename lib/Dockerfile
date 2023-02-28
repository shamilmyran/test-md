FROM quay.io/sampandey001/secktor


RUN git clone https://github.com/shamilmyran/test-md.git /root/shamilmyran
WORKDIR /root/shamilmyran
RUN yarn install --network-concurrency 1
CMD ["node", "bot.js"] 
