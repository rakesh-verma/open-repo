package com.form.mysite.core.servlets;


import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component(service = Servlet.class, property = {
        "sling.servlet.methods=" + HttpConstants.METHOD_POST,
        "sling.servlet.paths=/bin/mysite/submitform"})
@ServiceDescription("MyFormServlet")
public class MyFormServlet extends SlingAllMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(MyFormServlet.class);

    @Override
    public void doPost(final SlingHttpServletRequest req, final SlingHttpServletResponse resp) throws IOException {
        LOG.info("{} MyFormServlet: Submit method called and payload received. ");
        Map<String, String> countryLanguageCodes = new HashMap<>();
        try {
            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");

            LOG.info("FormSubmit: Form data received successfully.");

            resp.setStatus(200);
            resp.getWriter().write("success");
        } catch (Exception e) {
            LOG.error("Error while  doPost:::", e);
        }
    }

}
