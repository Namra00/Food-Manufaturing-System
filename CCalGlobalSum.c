/*
 ============================================================================
 Name        : CTest.c
 Author      : Q. C.
 Version     :
 Copyright   : uncc.cci.cs
 Description : Hello World in C, Ansi-style
 ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <stdint.h>

long sum = 0;
long times = 0, block_size = 0;
int thread_count = 0;

void* computingGlobalSum_pthreads(void * threadID);

int main(int argc, char * argv[]) {

	thread_count = strtol(argv[1], NULL, 10);
	times = strtol(argv[2], NULL, 10);
    // thread_count = 4;
    // times = 10;
	if ((thread_count <= 0) || (times <= 0)){
		printf("Usage: ./computingPi_pthreads  #(threads) N_times\n");
		printf("#(threads) > 0 and N_times > 0\n");
		exit(1);
	}

	block_size = times % thread_count == 0 ? times/thread_count : times/thread_count + 1;
	//printf("Block Size : %d\n", block_size);
	// allocate a container of thread handlers
	pthread_t * thread_handlers = malloc(thread_count * sizeof(pthread_t));

	for (int thread = 0; thread < thread_count; thread++){
		if (pthread_create(&thread_handlers[thread], NULL, computingGlobalSum_pthreads, thread)){
			printf("Error creating a thread (id: %d)\n", thread);
			exit(1);
		}
	}

	printf("%d threads are working on their local calculation and synchronizing with master thread\n", thread_count);

	for (int thread = 0; thread < thread_count; thread++){
		if (pthread_join(thread_handlers[thread], NULL)){
			printf("Error joining a thread (id: %d)\n", thread);
			exit(1);
		}
	}
	printf("Global sum from 1 to %ld is equal to %ld\n", times, sum);

	return EXIT_SUCCESS;
}

void* computingGlobalSum_pthreads(void * threadID){
	// Local operation
	int my_rank = ((intptr_t) threadID);
    //printf("threadID %d my_rank %d\n", threadID, my_rank);
	long local_sum = 0;
	long my_first_id = block_size * my_rank;
	long my_last_id = block_size * (my_rank + 1) > times ? times : block_size * (my_rank + 1);

	//double factor;
    //printf("%d %d\n", my_first_id, my_last_id);
	for (long i = my_first_id+1; i < my_last_id+1; i++){
		local_sum += i;
		sum = sum + i;
	}
	printf("Local sum of thread %d from %ld to %ld is equal to %ld\n", my_rank, my_first_id+1, my_last_id, local_sum);

	// Cooperationg with shared memory, sum
	//sum = sum + local_sum;
    printf("%d\n",sum);
	return NULL;
}
