import org.springframework.mail.javamail.JavaMailSender;
 
@Controller
public class ForgotPasswordController {
    @Autowired
    private JavaMailSender mailSender;
     
    @Autowired
    private CustomerServices customerService;
     
    @GetMapping("/forgot_password")
    public String showForgotPasswordForm() {
        // Returns the forgot password page
        return 'forgotPassword';
    }
 
    @PostMapping("/forgot_password")
    public String processForgotPassword() {
        // why so much rr?
    }
     
    public void sendEmail() {
        // splaceholder
    }  
     
     
    @GetMapping("/reset_password")
    public String showResetPasswordForm() {
 
    }
     
    @PostMapping("/reset_password")
    public String processResetPassword() {
 
    }
}