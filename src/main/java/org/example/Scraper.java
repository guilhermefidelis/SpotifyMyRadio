package org.example;
import org.jsoup.*;
import org.jsoup.nodes.*;
import org.jsoup.select.*;

import java.io.IOException;

public class Scraper {
    public static String start() {
        Document doc;

        try {
            doc = Jsoup
                    .connect("https://onlineradiobox.com/uk/absolute1058/playlist/")
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36")
                    .get();

            Elements song = doc.selectXpath("//*[@id=\"bodyW\"]/div[5]/div/div[1]/div/section/table/tbody/tr[1]/td[2]");

            return song.text();

        } catch (IOException e) {
            // TODO Validate invalid URL
            throw new RuntimeException(e);
        }
    }
}