FROM quay.io/sampandey001/secktor


RUN git clone https://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@github.com/Alien-Alfa/Alfa-X-Asena-Whatsapp-MD /root/AlienAlfa
WORKDIR /root/AlienAlfa
RUN yarn install --network-concurrency 1
CMD ["node", "bot.js"] 
