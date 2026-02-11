server {
    listen {{ .interface }}:{{ .port }} default_server;

    include /etc/nginx/includes/server_params.conf;
    include /etc/nginx/includes/proxy_params.conf;

    location = /onboarding {
        root /etc/nginx/www;
        add_header Cache-Control "no-store";
        try_files /onboarding.html =404;
    }

    location = /onboarding.json {
        alias /data/tailscale-onboarding.json;
        default_type application/json;
        add_header Cache-Control "no-store";
    }

    location = /runtime.json {
        alias /data/tailscale-runtime.json;
        default_type application/json;
        add_header Cache-Control "no-store";
    }

    location = /support-api {
        proxy_connect_timeout 1s;
        proxy_send_timeout 2s;
        proxy_read_timeout 5s;
        add_header Cache-Control "no-store";
        proxy_pass http://127.0.0.1:25910/cgi-bin/support;
    }

    location = /control-api {
        proxy_connect_timeout 1s;
        proxy_send_timeout 2s;
        proxy_read_timeout 10s;
        add_header Cache-Control "no-store";
        proxy_pass http://127.0.0.1:25910/cgi-bin/control;
    }

    location = /webui {
        proxy_connect_timeout 2s;
        proxy_send_timeout 8s;
        proxy_read_timeout 8s;
        proxy_set_header Accept-Encoding "";
        proxy_set_header Host $host;
        proxy_hide_header X-Frame-Options;
        proxy_hide_header Content-Security-Policy;
        add_header Content-Security-Policy "frame-ancestors 'self'" always;
        proxy_intercept_errors on;
        error_page 500 502 503 504 = /onboarding;
        proxy_pass http://backend;
    }

    location = /webui-ready {
        proxy_connect_timeout 2s;
        proxy_send_timeout 3s;
        proxy_read_timeout 3s;
        proxy_pass http://backend;
    }

    location / {
        root /etc/nginx/www;
        add_header Cache-Control "no-store";
        try_files $uri /onboarding.html =404;
    }
}
