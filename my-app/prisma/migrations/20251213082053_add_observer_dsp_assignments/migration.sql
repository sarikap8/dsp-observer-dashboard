-- CreateTable
CREATE TABLE "observer_dsp_assignments" (
    "assignment_id" TEXT NOT NULL,
    "observer_id" TEXT NOT NULL,
    "dsp_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "observer_dsp_assignments_pkey" PRIMARY KEY ("assignment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "observer_dsp_assignments_observer_id_dsp_id_key" ON "observer_dsp_assignments"("observer_id", "dsp_id");

-- AddForeignKey
ALTER TABLE "observer_dsp_assignments" ADD CONSTRAINT "observer_dsp_assignments_observer_id_fkey" FOREIGN KEY ("observer_id") REFERENCES "observers"("observer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "observer_dsp_assignments" ADD CONSTRAINT "observer_dsp_assignments_dsp_id_fkey" FOREIGN KEY ("dsp_id") REFERENCES "dsps"("dsp_id") ON DELETE CASCADE ON UPDATE CASCADE;
