package com.morganizer.notification;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

@RestController
public class NotificationController {

    @RequestMapping("/notifications")
    public void subscribeNotification(@RequestBody Map request, HttpServletResponse response)
            throws ServletException, IOException, JSONException {

        //System.out.println("Enter localhost:8080/notifications." );

        JSONObject jsonObject = new JSONObject(request);
        System.out.println("jsonObject:" + jsonObject);

        //subscriberId should be read from front end, which is the subscriber URL
        String subscriberUri = (String) jsonObject.get("subscriberUri");
        System.out.println("subscriberUri=" + subscriberUri);

        //Set header to our response
        //for local test: response.setHeader("Location", "http://localhost:8080/notifications/0101");
        //set server port as s1
        response.setHeader("Location", "");
        PrintWriter out = response.getWriter();
        String result = "Success to Subscribe a notification! ";
        out.write(result);

    }

    @RequestMapping("/sendNotification")
    public void sendNotification(@RequestBody Map request, HttpServletResponse response)
            throws ServletException, IOException, JSONException {

        System.out.println("request:" + request);

        JSONObject jsonObject = new JSONObject(request);
        System.out.println("jsonObject:" + jsonObject);
        String subscriptionId = (String) jsonObject.get("subscriptionId");

        System.out.println("subscriptionId=" + subscriptionId);

        // establish connection and send the notification to subscriber address
        HttpURLConnection subscribeConnection = null;
        StringBuffer responseBuffer = new StringBuffer();
        try{
            URL getsubscribeURL = new URL(subscriptionId);

            //establish connection between server and subscriber
            subscribeConnection = (HttpURLConnection) getsubscribeURL.openConnection();
            subscribeConnection.setDoOutput(true);
            subscribeConnection.setDoInput(true);
            subscribeConnection.setRequestMethod("POST");
            subscribeConnection.setRequestProperty("Accept-Charset", "utf-8");
            subscribeConnection.setRequestProperty("Content-Type", "application/json");
            subscribeConnection.setRequestProperty("Charset", "UTF-8");
            byte[] data = (jsonObject.toString()).getBytes();
            subscribeConnection.setRequestProperty("Content-Length", String.valueOf(data.length));

            // request for connection
            subscribeConnection.connect();
            OutputStream out = subscribeConnection.getOutputStream();

            // write string into the request
            out.write((jsonObject.toString()).getBytes());
            out.flush();
            out.close();
        }catch (IOException e) {
        }

        //Judge if subscription is successful
        if (subscribeConnection.getResponseCode() == 200) {
            System.out.println("Success to send the notification." );
            String readLine;
            BufferedReader responseReader = new BufferedReader(new InputStreamReader(
                    subscribeConnection.getInputStream(), "utf-8"));
            while ((readLine = responseReader.readLine()) != null) {
                responseBuffer.append(readLine);
            }
            System.out.println("Http Response:" + responseBuffer);
            subscribeConnection.disconnect();

            PrintWriter out = response.getWriter();
            out.write(responseBuffer.toString());
        }else {
            return;
        }
    }

}
