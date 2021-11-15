package vn.edu.greenwich.javade;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

public class TestActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);

        TextView tvUsername = findViewById(R.id.tvUsername_Test);
        TextView tvPassword = findViewById(R.id.tvPassword_Test);
        TextView tvt3 = findViewById(R.id.tvt3);
        TextView tvt4 = findViewById(R.id.tvt4);
        TextView tvt5 = findViewById(R.id.tvt5);
        TextView tvt6 = findViewById(R.id.tvt6);
        TextView tvt7 = findViewById(R.id.tvt7);
        TextView tvt8 = findViewById(R.id.tvt8);
        TextView tvt9 = findViewById(R.id.tvt9);
        TextView tvt10 = findViewById(R.id.tvt10);
        TextView tvt11 = findViewById(R.id.tvt11);


        String username = "";
        String password = "";
        String tv3 = "";
        String tv4 = "";
        String tv5 = "";
        String tv6 = "";
        String tv7 = "";
        String tv8 = "";
        String tv9 = "";
        String tv10 = "";
        String tv11 = "";


        Intent intent = getIntent();

        // 1st method to receive data.
        Bundle bundle = intent.getExtras();

        if (bundle != null) {
            username = bundle.getString("username");
            password = bundle.getString("password");
            tv3 = bundle.getString("tvt3");
            tv4 = bundle.getString("tvt4");
            tv5 = bundle.getString("tvt5");
            tv6 = bundle.getString("tvt6");
            tv7 = bundle.getString("tvt7");
            tv8 = bundle.getString("tvt8");
            tv9 = bundle.getString("tvt9");
            tv10 = bundle.getString("tvt10");
            tv11 = bundle.getString("tvt11");

        }

        // 2nd method to receive data.
        //username = intent.getStringExtra("username");
        //password = intent.getStringExtra("password");

        tvUsername.setText(username);
        tvPassword.setText(password);
        tvt3.setText(tv3);
        tvt4.setText(tv4);
        tvt5.setText(tv5);
        tvt6.setText(tv6);
        tvt7.setText(tv7);
        tvt8.setText(tv8);
        tvt9.setText(tv9);
        tvt10.setText(tv10);
        tvt11.setText(tv11);


    }
}