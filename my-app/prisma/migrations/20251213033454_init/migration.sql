-- CreateTable
CREATE TABLE "question_responses" (
    "question_response_id" TEXT NOT NULL,
    "q1" INTEGER,
    "q2" INTEGER,
    "q3" INTEGER,
    "q4" INTEGER,
    "q5" INTEGER,
    "q6" INTEGER,
    "q7" INTEGER,
    "q8" INTEGER,
    "q9" INTEGER,
    "q10" INTEGER,
    "q11" INTEGER,
    "q12" INTEGER,
    "q13" INTEGER,
    "q14" INTEGER,
    "q15" INTEGER,
    "q16" INTEGER,
    "q17" INTEGER,
    "q18" INTEGER,
    "q19" INTEGER,
    "q20" INTEGER,
    "q21" INTEGER,
    "q22" INTEGER,
    "q23" INTEGER,
    "q24" INTEGER,
    "q25" INTEGER,
    "q26" INTEGER,
    "q27" INTEGER,
    "q28" INTEGER,
    "q29" INTEGER,
    "q30" INTEGER,
    "q31" INTEGER,
    "q32" INTEGER,
    "q33" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "question_responses_pkey" PRIMARY KEY ("question_response_id")
);

-- CreateTable
CREATE TABLE "observers" (
    "observer_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "observers_pkey" PRIMARY KEY ("observer_id")
);

-- CreateTable
CREATE TABLE "observer_submissions" (
    "submission_id" TEXT NOT NULL,
    "observer_id" TEXT NOT NULL,
    "dsp_id" TEXT NOT NULL,
    "question_response_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "observer_submissions_pkey" PRIMARY KEY ("submission_id")
);

-- CreateTable
CREATE TABLE "dsps" (
    "dsp_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dsps_pkey" PRIMARY KEY ("dsp_id")
);

-- CreateTable
CREATE TABLE "dsp_submissions" (
    "submission_id" TEXT NOT NULL,
    "dsp_id" TEXT NOT NULL,
    "question_response_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dsp_submissions_pkey" PRIMARY KEY ("submission_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "observers_email_key" ON "observers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "observer_submissions_question_response_id_key" ON "observer_submissions"("question_response_id");

-- CreateIndex
CREATE UNIQUE INDEX "observer_submissions_observer_id_dsp_id_key" ON "observer_submissions"("observer_id", "dsp_id");

-- CreateIndex
CREATE UNIQUE INDEX "dsps_email_key" ON "dsps"("email");

-- CreateIndex
CREATE UNIQUE INDEX "dsp_submissions_dsp_id_key" ON "dsp_submissions"("dsp_id");

-- CreateIndex
CREATE UNIQUE INDEX "dsp_submissions_question_response_id_key" ON "dsp_submissions"("question_response_id");

-- AddForeignKey
ALTER TABLE "observer_submissions" ADD CONSTRAINT "observer_submissions_observer_id_fkey" FOREIGN KEY ("observer_id") REFERENCES "observers"("observer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observer_submissions" ADD CONSTRAINT "observer_submissions_dsp_id_fkey" FOREIGN KEY ("dsp_id") REFERENCES "dsps"("dsp_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observer_submissions" ADD CONSTRAINT "observer_submissions_question_response_id_fkey" FOREIGN KEY ("question_response_id") REFERENCES "question_responses"("question_response_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dsp_submissions" ADD CONSTRAINT "dsp_submissions_dsp_id_fkey" FOREIGN KEY ("dsp_id") REFERENCES "dsps"("dsp_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dsp_submissions" ADD CONSTRAINT "dsp_submissions_question_response_id_fkey" FOREIGN KEY ("question_response_id") REFERENCES "question_responses"("question_response_id") ON DELETE CASCADE ON UPDATE CASCADE;
