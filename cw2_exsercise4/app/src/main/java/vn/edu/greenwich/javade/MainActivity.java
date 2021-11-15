package vn.edu.greenwich.javade;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Link to the layout "activity_main.xml".
        setContentView(R.layout.activity_main);

        // Get the content of string "btn_login" in "strings.xml".
        String btnLoginName = getResources().getString(R.string.btn_login);
        // Get the content of string "notification_01" in "strings.xml".
        String notification_01 = getResources().getString(R.string.notification_01);

        // Like "alert" in JavaScript.
        Toast.makeText(this, notification_01, Toast.LENGTH_LONG).show();

        // Get button "Login" from current Layout using id of button.
        Button btnLogin = findViewById(R.id.btnLogin);
        // Set the name of the button.
        btnLogin.setText(btnLoginName);
        // Add an event "Click" to the button.
        btnLogin.setOnClickListener(btnLogin_Click);
    }

    private View.OnClickListener btnLogin_Click = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Boolean isValid = true;

            TextView tvError = findViewById(R.id.tvError);
            TextView tvUsername = findViewById(R.id.tvUsername);
            TextView tvPassword = findViewById(R.id.tvPassword);
            TextView tv_3 = findViewById(R.id.tv_3);
            TextView tv_4 = findViewById(R.id.tv_4);
            TextView tv_5 = findViewById(R.id.tv_5);
            TextView tv_6 = findViewById(R.id.tv_6);
            TextView tv_7 = findViewById(R.id.tv_7);
            TextView tv_8 = findViewById(R.id.tv_8);
            TextView tv_9 = findViewById(R.id.tv_9);
            TextView tv_10 = findViewById(R.id.tv_10);
            TextView tv_11 = findViewById(R.id.tv_11);


            String error = "";
            // Get content of textview "Username".
            String username = tvUsername.getText().toString();
            String tv3 = tv_3.getText().toString();
            String tv4 = tv_4.getText().toString();
            String tv5 = tv_5.getText().toString();
            String tv6 = tv_6.getText().toString();
            String tv7 = tv_7.getText().toString();

            String tv8 = tv_8.getText().toString();
            String tv9 = tv_9.getText().toString();
            String tv10 = tv_10.getText().toString();
            String tv11 = tv_11.getText().toString();



            // Get content of textview "Password".
            String password = tvPassword.getText().toString();
            String notification_02 = getResources().getString(R.string.notification_02);

            // Like "alert" in JavaScript.
//            Toast.makeText(v.getContext(), notification_02, Toast.LENGTH_LONG).show();

            // Check whether username is empty or not.
            if (TextUtils.isEmpty(username)) {
                isValid = false;
                error += "* Property Name cannot be blank.\n";
            }

            // Check whether password is empty or not.
            if (TextUtils.isEmpty(password)) {
                isValid = false;
                error += "* Property Address cannot be blank.\n";
            }
            if (TextUtils.isEmpty(tv3)) {
                isValid = false;
                error += "* City cannot be blank.\n";
            } if (TextUtils.isEmpty(tv4)) {
                isValid = false;
                error += "* District cannot be blank.\n";
            } if (TextUtils.isEmpty(tv5)) {
                isValid = false;
                error += "* Ward Address cannot be blank.\n";
            } if (TextUtils.isEmpty(tv6)) {
                isValid = false;
                error += "* Property Type cannot be blank.\n";
            }
            if (TextUtils.isEmpty(tv8)) {
                isValid = false;
                error += "* Bedroom  cannot be blank.\n";
            } if (TextUtils.isEmpty(tv9)) {
                isValid = false;
                error += "* Price  cannot be blank.\n";
            }
            if (TextUtils.isEmpty(tv10)) {
                isValid = false;
                error += "* Reporter cannot be blank.\n";
            }

            // Check whether form is valid or not.
            if (isValid) {
                // Show alerts.
                Toast.makeText(v.getContext(), username, Toast.LENGTH_LONG).show();
                Toast.makeText(v.getContext(), password, Toast.LENGTH_LONG).show();
                Toast.makeText(v.getContext(), tv3, Toast.LENGTH_LONG).show();
                Toast.makeText(v.getContext(), tv4, Toast.LENGTH_LONG).show();
                Toast.makeText(v.getContext(), tv5, Toast.LENGTH_LONG).show();
                Toast.makeText(v.getContext(), tv6, Toast.LENGTH_LONG).show();
                Toast.makeText(v.getContext(), tv7, Toast.LENGTH_LONG).show();
                Toast.makeText(v.getContext(), tv8, Toast.LENGTH_LONG).show();
                Toast.makeText(v.getContext(), tv9, Toast.LENGTH_LONG).show();
                Toast.makeText(v.getContext(), tv10, Toast.LENGTH_LONG).show();
                Toast.makeText(v.getContext(), tv11, Toast.LENGTH_LONG).show();




                // Show logs.
                Log.w("Main Activity", "This is a Warning Log.");
                Log.i("Main Activity", "This is an Information Log.");
                Log.d("Main Activity", "This is a Debug Log.");
                Log.v("Main Activity", "This is a Verbose Log.");

                Bundle accountInfo = new Bundle();
                accountInfo.putString("username", username);
                accountInfo.putString("password", password);
                accountInfo.putString("tvt3", tv3);
                accountInfo.putString("tvt4", tv4);
                accountInfo.putString("tvt5", tv5);
                accountInfo.putString("tvt6", tv6);
                accountInfo.putString("tvt7", tv7);
                accountInfo.putString("tvt8", tv8);
                accountInfo.putString("tvt9", tv9);
                accountInfo.putString("tvt10", tv10);
                accountInfo.putString("tvt11", tv11);


                // Create a new activity and start it.
                Intent testActivity = new Intent(v.getContext(), TestActivity.class);

                // 1st method to transfer data.
                testActivity.putExtras(accountInfo);

                // 2nd method to transfer data.
                //testActivity.putExtra("username", username);
                //testActivity.putExtra("password", password);

                // Start "TestActivity".
                startActivity(testActivity);

                // Terminate current activity.
                finish();
            } else {
                // Display errors in textview.
                tvError.setText(error);

                // Display errors in logs.
                Log.e("Main Activity", error);
            }
        }
    };
}