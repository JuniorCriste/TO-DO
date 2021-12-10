package io.ionic.starter;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
 //início ADMOB
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(com.getcapacitor.community.admob.AdMob.class);
    }

//fim ADMOB
}
