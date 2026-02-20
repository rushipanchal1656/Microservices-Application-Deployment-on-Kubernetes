FROM nginx:1.25-alpine

# remove default config
RUN rm /etc/nginx/conf.d/default.conf

# copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# copy static files
COPY app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
