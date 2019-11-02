export class Media {
    /*
    [
        {
            "mediaId":"9499343AC",
            "userId":"testUser",
            "notas":"No es un día cualquiera",
            "transcription":
            {
                "results": 
                [
                    {
                        "final": true,
                        "alternatives": 
                        [
                            {
                                "transcript": "debo decir que esta serie por cierto recibió críticas de esos tres boyero y varias en dos vamos bien porque me encanta o entonces yo creo que voy por buen camino ya mira ves tres enemigos más siento tenga enemigos no no tengo enemigos no ",
                                "confidence": 0.8
                            }
                        ]
                    }
                ],
                "result_index": 0
            }
        }
    ]
    */
   //{mediaId: "1000123AB", userId: "aobrie01", notas: "Test file", transcription: "0"}
   mediaId: string;
   userId: string;
   notas: string;
   transcription: string;
   fileName: string;
}