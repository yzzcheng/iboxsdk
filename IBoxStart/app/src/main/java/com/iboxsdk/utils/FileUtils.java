package com.iboxsdk.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;

public class FileUtils {
    public static void copy(String src,String desc) throws Exception {
        File srcFile = new File(src);
        File descFile = new File(desc);
        for(String file : srcFile.list()){
            File item = new File(file);
                 File newFile = new File(descFile,item.getName());
                 newFile.createNewFile();
                 OutputStream outputStream = new FileOutputStream(newFile);
                outputStream.write( StreamUtils.readInputStreamByte(new FileInputStream(item)));
                outputStream.close();
        }
    }
}
