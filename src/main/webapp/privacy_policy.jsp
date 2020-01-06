<%-- 
    Document   : privacy_policy
    Created on : 19/11/2018, 09:45:41 PM
    Author     : JCode
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html class="no-js" lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Clear Dry</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="<%out.print(getServletContext().getContextPath());%>/resources_app/favicon.png">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/font-awesome.min.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/themify-icons.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/metisMenu.css">
        <!-- others css -->
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/typography.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/default-css.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/styles.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/responsive.css">

        <!-- modernizr css -->
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/vendor/modernizr-2.8.3.min.js"></script>
    </head>

    <body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <!-- preloader area start -->
        <div id="preloader">
            <div class="loader"></div>
        </div>
        <!-- preloader area end -->
        <!-- page container area start -->
        <div class="page-container">
            <!-- sidebar menu area start -->
            <div class="sidebar-menu">
                <div class="sidebar-header">
                    <div class="logo">
                         <a href="index"><img id="logoEmpresa" src="assets/images/icon/facemubi.png" alt="logo"></a>

                    </div>
                    <br>
                    <h6 class="text-center" style="color: aliceblue"><i class="fa fa-user"></i> <strong><%out.print(((com.jcode.myapp.model.session.Usuario) request.getSession().getAttribute("usuario")).getUser());%></strong></h6>
                </div>
                <jsp:include page="menu.jsp"/>
            </div>
            <!-- sidebar menu area end -->
            <!-- main content area start -->
            <div class="main-content">
                <!-- header area start -->
                <div class="header-area">
                    <div class="row align-items-center">
                        <!-- nav and search button -->
                        <div class="col-4 clearfix">
                            <div class="nav-btn pull-left" style="margin-top: 0px">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <!-- profile info & task notification -->
                        <div class="col-8 clearfix">
                            <ul class="notification-area pull-right">
                                <li>
                                    <a href="cerrarsession">
                                        Cerrar Sessión
                                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- header area end -->
                <div class="main-content-inner">

                    <h2>Privacy Policy</h2> <p>
                        Mauricio Dioli ing. built the localhost app as
                        a Commercial app. This SERVICE is provided by
                        mauricio dioli and is intended for
                        use as is.
                    </p> <p>
                        This page is used to inform visitors regarding
                        my policies with the collection, use, and
                        disclosure of Personal Information if anyone decided to use
                        my Service.
                    </p> <p>
                        If you choose to use my Service, then you agree
                        to the collection and use of information in relation to this
                        policy. The Personal Information that I collect is
                        used for providing and improving the Service.
                        I will not use or share your
                        information with anyone except as described in this Privacy
                        Policy.
                    </p> <p>
                        The terms used in this Privacy Policy have the same meanings
                        as in our Terms and Conditions, which is accessible at
                        localhost unless otherwise defined in this Privacy
                        Policy.
                    </p> <p><strong>Information Collection and Use</strong></p> <p>
                        For a better experience, while using our Service,
                        I may require you to provide us with certain
                        personally identifiable information. The
                        information that I request will be
                        retained on your device and is not collected by me in any way.
                    </p> <p>
                        The app does use third party services that may collect
                        information used to identify you.
                    </p> <div><p>
                            Link to privacy policy of third party service providers
                            used by the app
                        </p> <ul><li><a href="https://www.google.com/policies/privacy/" target="_blank">Google Play Services</a></li><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----></ul></div> <p><strong>Log Data</strong></p> <p>
                        I want to inform you that whenever
                        you use my Service, in a case of an error in the
                        app I collect data and information (through third
                        party products) on your phone called Log Data. This Log Data
                        may include information such as your device Internet
                        Protocol (“IP”) address, device name, operating system
                        version, the configuration of the app when utilizing
                        my Service, the time and date of your use of the
                        Service, and other statistics.
                    </p> <p><strong>Cookies</strong></p> <p>
                        Cookies are files with a small amount of data that are
                        commonly used as anonymous unique identifiers. These are
                        sent to your browser from the websites that you visit and
                        are stored on your device's internal memory.
                    </p> <p>
                        This Service does not use these “cookies” explicitly.
                        However, the app may use third party code and libraries that
                        use “cookies” to collect information and improve their
                        services. You have the option to either accept or refuse
                        these cookies and know when a cookie is being sent to your
                        device. If you choose to refuse our cookies, you may not be
                        able to use some portions of this Service.
                    </p> <p><strong>Service Providers</strong></p> <p>
                        I may employ third-party companies
                        and individuals due to the following reasons:
                    </p> <ul><li>To facilitate our Service;</li> <li>To provide the Service on our behalf;</li> <li>To perform Service-related services; or</li> <li>To assist us in analyzing how our Service is used.</li></ul> <p>
                        I want to inform users of this
                        Service that these third parties have access to your
                        Personal Information. The reason is to perform the tasks
                        assigned to them on our behalf. However, they are obligated
                        not to disclose or use the information for any other
                        purpose.
                    </p> <p><strong>Security</strong></p> <p>
                        I value your trust in providing us
                        your Personal Information, thus we are striving to use
                        commercially acceptable means of protecting it. But remember
                        that no method of transmission over the internet, or method
                        of electronic storage is 100% secure and reliable, and
                        I cannot guarantee its absolute security.
                    </p> <p><strong>Links to Other Sites</strong></p> <p>
                        This Service may contain links to other sites. If you click
                        on a third-party link, you will be directed to that site.
                        Note that these external sites are not operated by
                        me. Therefore, I strongly advise you to
                        review the Privacy Policy of these websites.
                        I have no control over and assume no
                        responsibility for the content, privacy policies, or
                        practices of any third-party sites or services.
                    </p> <p><strong>Children’s Privacy</strong></p> <p>
                        These Services do not address anyone under the age of 13.
                        I do not knowingly collect personally
                        identifiable information from children under 13. In the case
                        I discover that a child under 13 has provided
                        me with personal information,
                        I immediately delete this from our servers. If you
                        are a parent or guardian and you are aware that your child
                        has provided us with personal information, please contact
                        me so that I will be able to do
                        necessary actions.
                    </p> <p><strong>Changes to This Privacy Policy</strong></p> <p>
                        I may update our Privacy Policy from
                        time to time. Thus, you are advised to review this page
                        periodically for any changes. I will
                        notify you of any changes by posting the new Privacy Policy
                        on this page. These changes are effective immediately after
                        they are posted on this page.
                    </p> <p><strong>Contact Us</strong></p> <p>
                        If you have any questions or suggestions about
                        my Privacy Policy, do not hesitate to contact
                        me at madioli26@hotmail.com.
                    </p> <p>
                        This privacy policy page was created at
                        <a href="https://privacypolicytemplate.net" target="_blank">privacypolicytemplate.net</a>
                        and modified/generated by
                        <a href="https://app-privacy-policy-generator.firebaseapp.com/" target="_blank">App Privacy Policy Generator</a></p>

                </div>
            </div>
            <!-- main content area end -->
            <!-- footer area start-->
            <jsp:include page="footer.jsp"/>
            <!-- footer area end-->
        </div>
        <!-- page container area end -->
        <!-- jquery latest version -->
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/vendor/jquery-2.2.4.min.js"></script>
        <!-- bootstrap 4 js -->
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/popper.min.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/bootstrap.min.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/metisMenu.min.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/jquery.slimscroll.min.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/jquery.slicknav.min.js"></script>

        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/scripts.js"></script>
    </body>
</html>
