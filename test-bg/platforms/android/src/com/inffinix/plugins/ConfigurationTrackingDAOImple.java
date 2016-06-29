package com.inffinix.plugins;

import android.content.Context;
import android.util.Log;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

/**
 * Created by eduardo on 29/06/16.
 */

public class ConfigurationTrackingDAOImple implements ConfigurationTrackingDAO{
    private static final String TAG = "FILE LOCATION";
    private static final String TAG_PARSE_FILE = "En obtencion de datos de getconfig location";
    private static final String TAG_OPEN_FILE = "En abrir archivo de getLocation";
    private static String PATH_FILE;
    private ConfigurationTracking configuration;
    private ObjectInputStream input;
    private ObjectOutputStream output;
    private Context ctx;

    public ConfigurationTrackingDAOImple(Context ctx) {
        File f = new File( PATH_FILE );
        // Si no existe el archivo lo crea con un obhjeto vasio
        if( !f.exists() ) {
            this.ctx = ctx;
            PATH_FILE = this.ctx.getFilesDir().getPath().toString() + "persistenceLocation.obj";
            configuration = new ConfigurationTracking();
            saveObject();
        }
    }

    public int insert( ConfigurationTracking ReceivedConfiguration ){
        int response = -1;
        configuration = ReceivedConfiguration;
        truncate();
        saveObject();
        return response;
    }

    public ConfigurationTracking getConfig() {
        configuration = null;
        try {
            input = new ObjectInputStream( new FileInputStream( PATH_FILE ) );
            configuration = ( ConfigurationTracking )input.readObject();
            input.close();
        } catch (ClassNotFoundException ex) {
            Log.d(TAG, TAG_PARSE_FILE);
            ex.printStackTrace();
        } catch (IOException ex) {
            Log.d(TAG, TAG_OPEN_FILE);
            ex.printStackTrace();
        }

        return configuration;
    }

    private int saveObject() {
        int response = -1;
        try {
            output = new ObjectOutputStream( ctx.openFileOutput( PATH_FILE, ctx.MODE_PRIVATE ) );
            output.writeObject( configuration );
            output.close();
            response = 0;
        } catch (IOException ex) {
            Log.d(TAG, TAG_OPEN_FILE);
            ex.printStackTrace();
        }
        return response;
    }

    private void truncate() {
        try {
            new FileOutputStream( PATH_FILE ).close();
        } catch (FileNotFoundException ex) {
            Log.d(TAG, TAG_OPEN_FILE);
            ex.printStackTrace();
        } catch (IOException ex) {
            Log.d(TAG, TAG_OPEN_FILE);
            ex.printStackTrace();
        }
    }
}