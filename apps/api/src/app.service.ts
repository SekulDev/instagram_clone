import { Injectable, OnModuleInit } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class AppService implements OnModuleInit {
    constructor(private dataSource: DataSource) {}

    async onModuleInit() {
        const checkFunctionQuery = `
            SELECT ROUTINE_NAME
            FROM information_schema.ROUTINES
            WHERE ROUTINE_SCHEMA = DATABASE() AND ROUTINE_NAME = 'levenshtein' AND ROUTINE_TYPE = 'FUNCTION'
        `;

        const result = await this.dataSource.query(checkFunctionQuery);

        if (result.length === 0) {
            const createFunctionQuery = `        
            CREATE FUNCTION levenshtein( s1 VARCHAR(255), s2 VARCHAR(255) )
            RETURNS INT
            DETERMINISTIC
            BEGIN
              DECLARE s1_len, s2_len, i, j, c, c_temp, cost INT;
              DECLARE s1_char CHAR;
              DECLARE cv0, cv1 VARBINARY(256);
    
              SET s1_len = CHAR_LENGTH(s1);
              SET s2_len = CHAR_LENGTH(s2);
              IF s1_len = 0 THEN
                RETURN s2_len;
              END IF;
              IF s2_len = 0 THEN
                RETURN s1_len;
              END IF;
              SET cv1 = 0x00;
              SET j = 1;
              WHILE j <= s2_len DO
                SET cv1 = CONCAT(cv1, UNHEX(HEX(j)));
                SET j = j + 1;
              END WHILE;
              SET i = 1;
              WHILE i <= s1_len DO
                SET s1_char = SUBSTRING(s1, i, 1);
                SET c = i;
                SET cv0 = UNHEX(HEX(i));
                SET j = 1;
                WHILE j <= s2_len DO
                  SET c = c + 1;
                  SET cost = IF(s1_char = SUBSTRING(s2, j, 1), 0, 1);
                  SET c_temp = CONV(HEX(SUBSTRING(cv1, j, 1)), 16, 10) + cost;
                  IF c > c_temp THEN SET c = c_temp; END IF;
                  SET c_temp = CONV(HEX(SUBSTRING(cv1, j+1, 1)), 16, 10) + 1;
                  IF c > c_temp THEN SET c = c_temp; END IF;
                  SET cv0 = CONCAT(cv0, UNHEX(HEX(c)));
                  SET j = j + 1;
                END WHILE;
                SET cv1 = cv0;
                SET i = i + 1;
              END WHILE;
              RETURN c;
            END;
            `;

            await this.dataSource.query(createFunctionQuery);
            console.log("Levenshtein function has been added to DB");
        } else {
            console.log("Levenshtein function is declared in DB");
        }
    }
}
